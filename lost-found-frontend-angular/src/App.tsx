import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  Container,
  TextField,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
} from '@mui/material';

interface LostItem {
  id: number;
  item_name: string;
  category: string;
  description: string;
  last_seen_location: string;
  date_lost: string;
  contact_info: string;
  created_at: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    description: '',
    last_seen_location: '',
    date_lost: '',
    contact_info: '',
  });

  const [message, setMessage] = useState('');
  const [lostItems, setLostItems] = useState<LostItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/lost-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Lost item reported successfully!');
        setFormData({
          item_name: '',
          category: '',
          description: '',
          last_seen_location: '',
          date_lost: '',
          contact_info: '',
        });
        fetchLostItems(); // Refresh list
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to server.');
      console.error(error);
    }
  };

  const fetchLostItems = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/lost-items');
      const data = await res.json();
      setLostItems(data);
    } catch (err) {
      console.error('Failed to fetch lost items', err);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lost & Found Portal
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Item Name" name="item_name" value={formData.item_name} onChange={handleChange} required />
        <TextField label="Category" name="category" value={formData.category} onChange={handleChange} required />
        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} required />
        <TextField label="Last Seen Location" name="last_seen_location" value={formData.last_seen_location} onChange={handleChange} />
        <TextField type="date" name="date_lost" value={formData.date_lost} onChange={handleChange} required InputLabelProps={{ shrink: true }} label="Date Lost" />
        <TextField label="Contact Info" name="contact_info" value={formData.contact_info} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Reported Lost Items
      </Typography>

      {lostItems.length === 0 ? (
        <Typography>No lost items reported yet.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  {lostItems.map(item => (
            <Box key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {item.item_name} ({item.category})
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="body2">
                    📍 {item.last_seen_location || 'Unknown'}
                  </Typography>
                  <Typography variant="body2">
                    📅 {item.date_lost}
                  </Typography>
                  <Typography variant="body2">
                    📞 {item.contact_info}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default App;
