import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactDetails: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/book', formData);
      console.log('Booking successful:', response.data);
      // Handle successful booking (e.g., show a success message, clear the form)
    } catch (error) {
      console.error('Error booking:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book a Bed</CardTitle>
        <CardDescription>Please fill in your details to make a booking.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactDetails">Contact Details</Label>
            <Input 
              id="contactDetails" 
              name="contactDetails" 
              value={formData.contactDetails} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Book Now</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;