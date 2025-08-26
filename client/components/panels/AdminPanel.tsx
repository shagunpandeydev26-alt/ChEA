import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { useNotifications } from '@/contexts/NotificationContext';
import EventManagement from '../admin/EventManagement';
import { 
  Users, Settings, BarChart3, Bell, Shield, Search, Edit, Trash2, Send, Eye, UserCheck, TrendingUp, Calendar
} from 'lucide-react';

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  membershipType: string;
  membershipStatus: string;
  joinDate: string;
  paymentStatus: string;
}

const AdminPanel: React.FC = () => {
  const { isAdmin, userProfile } = useUser();
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [users] = useState<AdminUser[]>([
    {
      uid: '1',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      membershipType: 'student',
      membershipStatus: 'active',
      joinDate: '2024-01-15',
      paymentStatus: 'paid'
    },
    {
      uid: '2',
      email: 'jane.smith@example.com',
      displayName: 'Jane Smith',
      membershipType: 'alumni',
      membershipStatus: 'active',
      joinDate: '2023-08-20',
      paymentStatus: 'paid'
    }
  ]);

  const [stats] = useState({
    totalUsers: 247,
    activeMembers: 198,
    pendingPayments: 15,
    newThisMonth: 23
  });

  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  });

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300">Access Denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotification = () => {
    if (!notificationForm.title) {
      showToast('error', 'Missing Title', 'Please enter a notification title');
      return;
    }
    showToast('success', 'Notification Sent', `Notification sent to all users`);
    setNotificationForm({ title: '', message: '', type: 'info' });
  };

  const getMembershipBadgeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-yellow-500/20 text-yellow-300';
      case 'alumni': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-green-500/20 text-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-chea-dark p-6 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">Welcome back, {userProfile?.displayName}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-chea-dark-card border border-chea-red/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Users</p>
                      <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-chea-red" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Active Members</p>
                      <p className="text-2xl font-bold text-white">{stats.activeMembers}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending Payments</p>
                      <p className="text-2xl font-bold text-white">{stats.pendingPayments}</p>
                    </div>
                    <Bell className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">New This Month</p>
                      <p className="text-2xl font-bold text-white">{stats.newThisMonth}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardContent className="p-6">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-chea-dark border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 text-gray-300">User</th>
                        <th className="text-left py-3 px-4 text-gray-300">Membership</th>
                        <th className="text-left py-3 px-4 text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300">Join Date</th>
                        <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.uid} className="border-b border-gray-700 hover:bg-chea-dark/50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white font-medium">{user.displayName}</p>
                              <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getMembershipBadgeColor(user.membershipType)}>
                              {user.membershipType.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-500/20 text-green-300">
                              {user.membershipStatus.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <EventManagement />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white">Send Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-300 block mb-2">Title</label>
                  <Input
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-chea-dark border-gray-600 text-white"
                    placeholder="Notification title"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Message</label>
                  <Textarea
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-chea-dark border-gray-600 text-white"
                    placeholder="Notification message"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleSendNotification}
                  className="bg-chea-red hover:bg-chea-red-dark w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Auto-approve new members</label>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Email notifications</label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Maintenance mode</label>
                  <input type="checkbox" className="rounded" />
                </div>
                <Button className="bg-chea-red hover:bg-chea-red-dark">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;