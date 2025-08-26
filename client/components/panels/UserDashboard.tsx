import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { useNotifications } from '@/contexts/NotificationContext';
import UserProfilePanel from './UserProfilePanel';
import { 
  User, Bell, Settings, Calendar, Trophy, CreditCard, Shield, CheckCircle, Star, Gift, Users, BookOpen, Award, X
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { userProfile, loading } = useUser();
  const { notifications, removeNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chea-red mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const getMembershipBadgeColor = (type: string) => {
    switch (type) {
      case 'premium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'faculty':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'alumni':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <Bell className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <Bell className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Bell className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-chea-dark p-6 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
              {userProfile.profilePicture ? (
                <img
                  src={userProfile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-light text-white">
                Welcome, {userProfile.firstName || userProfile.displayName}!
              </h1>
              <p className="text-gray-300">
                Membership ID: {userProfile.membershipDetails.membershipId}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-chea-dark-card border border-chea-red/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="membership" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <CreditCard className="w-4 h-4 mr-2" />
              Membership
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {notifications.length > 0 && (
                <Badge className="ml-2 bg-chea-red text-white">{notifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-chea-red data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Membership Status */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Membership</p>
                      <Badge className={`mt-1 ${getMembershipBadgeColor(userProfile.membershipDetails.membershipType)}`}>
                        {userProfile.membershipDetails.membershipType.toUpperCase()}
                      </Badge>
                    </div>
                    <Shield className="w-8 h-8 text-chea-red" />
                  </div>
                </CardContent>
              </Card>

              {/* Member Since */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Member Since</p>
                      <p className="text-lg font-semibold text-white">
                        {formatDate(userProfile.membershipDetails.joinDate)}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-chea-red" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Status */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Payment Status</p>
                      <Badge className={`mt-1 ${
                        userProfile.membershipDetails.paymentStatus === 'paid' 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : userProfile.membershipDetails.paymentStatus === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {userProfile.membershipDetails.paymentStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <CreditCard className="w-8 h-8 text-chea-red" />
                  </div>
                </CardContent>
              </Card>

              {/* Active Status */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Status</p>
                      <Badge className={`mt-1 ${
                        userProfile.membershipDetails.isActive 
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {userProfile.membershipDetails.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </Badge>
                    </div>
                    <CheckCircle className="w-8 h-8 text-chea-red" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-chea-red hover:bg-chea-red-dark">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Programs
                  </Button>
                  <Button variant="outline" className="border-chea-red/30 text-white hover:bg-chea-red/20">
                    <Users className="w-4 h-4 mr-2" />
                    Join Events
                  </Button>
                  <Button variant="outline" className="border-chea-red/30 text-white hover:bg-chea-red/20">
                    <Award className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Membership Benefits */}
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Your Membership Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userProfile.membershipDetails.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <UserProfilePanel />
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership" className="space-y-6">
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Membership Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Membership ID</label>
                      <p className="text-lg font-mono text-white bg-chea-dark p-2 rounded border border-gray-600">
                        {userProfile.membershipDetails.membershipId}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-400">Membership Type</label>
                      <div className="mt-1">
                        <Badge className={`text-lg px-4 py-2 ${getMembershipBadgeColor(userProfile.membershipDetails.membershipType)}`}>
                          {userProfile.membershipDetails.membershipType.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-400">Join Date</label>
                      <p className="text-white">{formatDate(userProfile.membershipDetails.joinDate)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Payment Status</label>
                      <div className="mt-1">
                        <Badge className={`text-lg px-4 py-2 ${
                          userProfile.membershipDetails.paymentStatus === 'paid' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : userProfile.membershipDetails.paymentStatus === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                          {userProfile.membershipDetails.paymentStatus.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-400">Status</label>
                      <div className="mt-1">
                        <Badge className={`text-lg px-4 py-2 ${
                          userProfile.membershipDetails.isActive 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {userProfile.membershipDetails.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Membership Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {userProfile.membershipDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-chea-red hover:bg-chea-red-dark">
                    Upgrade Membership
                  </Button>
                  <Button variant="outline" className="border-chea-red/30 text-white hover:bg-chea-red/20">
                    Renew Membership
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-chea-dark-card border-chea-red/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-4 bg-chea-dark rounded-lg border border-gray-600"
                      >
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{notification.title}</h4>
                          {notification.message && (
                            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notification Preferences */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Email Notifications</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.notifications.email}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Push Notifications</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.notifications.push}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Event Notifications</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.notifications.events}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Newsletter</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.notifications.newsletters}
                        className="rounded"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="bg-chea-dark-card border-chea-red/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 block mb-2">Profile Visibility</label>
                      <select className="w-full bg-chea-dark border border-gray-600 text-white rounded p-2">
                        <option value="public">Public</option>
                        <option value="members">Members Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Show Email</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.privacy.showEmail}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-300">Show Phone</label>
                      <input
                        type="checkbox"
                        checked={userProfile.preferences.privacy.showPhone}
                        className="rounded"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button className="bg-chea-red hover:bg-chea-red-dark">
                Save Settings
              </Button>
              <Button variant="outline" className="border-chea-red/30 text-white hover:bg-chea-red/20">
                Reset to Default
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;