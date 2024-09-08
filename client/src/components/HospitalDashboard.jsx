import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';

const HospitalDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const results = bookings.filter(booking =>
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(results);
  }, [searchTerm, bookings]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hospital Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="search">Search Bookings</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name, city, or state"
            value={searchTerm}
            onChange={handleSearch}
            className="mt-1"
          />
        </div>
        <Table>
          <TableCaption>A list of all bed bookings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Details</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Booking Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.contactDetails}</TableCell>
                <TableCell>{booking.city}</TableCell>
                <TableCell>{booking.state}</TableCell>
                <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HospitalDashboard;