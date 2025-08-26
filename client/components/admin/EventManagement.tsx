import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Switch } from '../ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  updateEventPriorities,
  testFirebaseConnection 
} from '@/services/eventService';
import { Event, EventFormData } from '@/types/event';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users, 
  Camera,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  TestTube
} from 'lucide-react';
import { runFirebaseTest } from '@/utils/firebaseTest';

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    imageUrl: '',
    date: '',
    location: '',
    priority: 1,
    isActive: true,
  });

  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('🔄 [EventManagement] Fetching events from Firebase...');
      const fetchedEvents = await getEvents();
      console.log('📊 [EventManagement] Fetched events:', fetchedEvents.length, fetchedEvents);
      setEvents(fetchedEvents);
      
      // Additional debug info
      if (fetchedEvents.length > 0) {
        console.log('✅ [EventManagement] Events loaded successfully:', {
          total: fetchedEvents.length,
          active: fetchedEvents.filter(e => e.isActive).length,
          inactive: fetchedEvents.filter(e => !e.isActive).length
        });
      } else {
        console.log('⚠️ [EventManagement] No events found in Firebase');
      }
    } catch (error) {
      console.error('❌ [EventManagement] Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      date: '',
      location: '',
      priority: events.length + 1,
      isActive: true,
    });
    setEditingEvent(null);
  };

  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      imageUrl: event.image,
      date: event.date,
      location: event.location,
      priority: event.priority,
      isActive: event.isActive,
    });
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const result = await uploadToCloudinary(file, {
        folder: 'chea/events',
        transformation: 'w_800,h_600,c_fill'
      });
      setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to manage events',
        variant: 'destructive',
      });
      return;
    }

    console.log('💾 [EventManagement] Starting event save process...');
    console.log('📄 [EventManagement] Form data:', formData);
    console.log('👤 [EventManagement] Current user:', currentUser.uid, currentUser.email);

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl,
        date: formData.date,
        location: formData.location,
        priority: formData.priority,
        isActive: formData.isActive,
      };

      console.log('📁 [EventManagement] Event data to save:', eventData);

      if (editingEvent) {
        console.log('✏️ [EventManagement] Updating existing event:', editingEvent.id);
        // Update existing event
        await updateEvent({
          id: editingEvent.id,
          ...eventData,
          updatedAt: new Date().toISOString(),
        });
        console.log('✅ [EventManagement] Event updated successfully!');
        toast({
          title: 'Success',
          description: 'Event updated successfully',
        });
      } else {
        console.log('➕ [EventManagement] Creating new event...');
        // Create new event
        const eventId = await createEvent(eventData, currentUser.uid);
        console.log('✅ [EventManagement] Event created successfully with ID:', eventId);
        toast({
          title: 'Success',
          description: `Event created successfully! ID: ${eventId}`,
        });
      }

      setIsFormOpen(false);
      resetForm();
      console.log('🔄 [EventManagement] Refreshing events list...');
      await fetchEvents();
      console.log('🎉 [EventManagement] Process completed successfully!');
    } catch (error) {
      console.error('❌ [EventManagement] Error saving event:', error);
      toast({
        title: 'Error',
        description: `Failed to save event: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent(eventId);
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      });
    }
  };

  const movePriority = async (eventId: string, direction: 'up' | 'down') => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const newPriority = direction === 'up' ? event.priority - 1 : event.priority + 1;
    const otherEvent = events.find(e => e.priority === newPriority);

    if (!otherEvent || newPriority < 1) return;

    try {
      // Swap priorities
      await updateEventPriorities([
        { id: event.id, priority: newPriority },
        { id: otherEvent.id, priority: event.priority }
      ]);
      
      toast({
        title: 'Success',
        description: 'Event priority updated',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error updating priority:', error);
      toast({
        title: 'Error',
        description: 'Failed to update priority',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chea-red mx-auto mb-4"></div>
          <p className="text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-light text-white">Event Management</h2>
          <p className="text-gray-400 mt-2">Manage website events with priority ordering</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={async () => {
              const result = await runFirebaseTest();
              toast({
                title: result.success ? 'Firebase Test Passed' : 'Firebase Test Failed',
                description: result.message,
                variant: result.success ? 'default' : 'destructive'
              });
            }}
            variant="outline"
            size="sm"
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test Firebase
          </Button>
          <Button 
            onClick={openAddForm}
            className="bg-chea-red hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {events.length === 0 ? (
          <Card className="bg-chea-dark-card border-chea-red/20">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Events Found</h3>
              <p className="text-gray-400 mb-6">Get started by creating your first event</p>
              <Button onClick={openAddForm} className="bg-chea-red hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map((event, index) => (
            <Card key={event.id} className="bg-chea-dark-card border-chea-red/20">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Event Image */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-700">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-medium text-white">{event.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            event.isActive 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                              : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}
                        >
                          {event.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Priority: {event.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex lg:flex-col gap-2">
                    {/* Priority Controls */}
                    <div className="flex lg:flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => movePriority(event.id, 'up')}
                        disabled={index === 0}
                        className="border-chea-red/30 text-gray-300 hover:bg-chea-red/10"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => movePriority(event.id, 'down')}
                        disabled={index === events.length - 1}
                        className="border-chea-red/30 text-gray-300 hover:bg-chea-red/10"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Edit & Delete */}
                    <div className="flex lg:flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditForm(event)}
                        className="border-chea-red/30 text-gray-300 hover:bg-chea-red/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(event.id)}
                        className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-chea-dark-card border-chea-red/20 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingEvent ? 'Update event details' : 'Create a new event for the website'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8 pb-6">
            {/* Event Title */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-gray-300 text-lg font-medium">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-chea-dark border-gray-600 text-white h-12 text-lg"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Event Description */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-gray-300 text-lg font-medium">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-chea-dark border-gray-600 text-white min-h-32 text-lg"
                placeholder="Enter detailed event description"
                required
              />
            </div>

            {/* Event Image */}
            <div className="space-y-4">
              <Label className="text-gray-300 text-lg font-medium">Event Image</Label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="bg-chea-dark border-gray-600 text-white h-12"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-chea-red mr-3"></div>
                      <p className="text-gray-400">Uploading image...</p>
                    </div>
                  )}
                </div>
                {formData.imageUrl && (
                  <div className="space-y-3">
                    <p className="text-sm text-green-400">✓ Image uploaded successfully</p>
                    <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden bg-gray-700 mx-auto">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                      className="border-red-500/30 text-red-300 hover:bg-red-500/10 mx-auto block"
                    >
                      Remove Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Date and Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="date" className="text-gray-300 text-lg font-medium">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-chea-dark border-gray-600 text-white h-12 text-lg"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="priority" className="text-gray-300 text-lg font-medium">Priority Order</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                  className="bg-chea-dark border-gray-600 text-white h-12 text-lg"
                  placeholder="1 = Highest priority"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label htmlFor="location" className="text-gray-300 text-lg font-medium">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-chea-dark border-gray-600 text-white h-12 text-lg"
                placeholder="Enter event location"
                required
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3 p-4 bg-chea-dark/50 rounded-lg">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <div>
                <Label htmlFor="isActive" className="text-gray-300 text-lg font-medium">
                  Active (visible on website)
                </Label>
                <p className="text-sm text-gray-400 mt-1">
                  Toggle to make this event visible to website visitors
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-600">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12 px-8"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-chea-red hover:bg-red-700 h-12 px-8"
                disabled={uploading}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManagement;