'use client';
import { useState } from 'react';
import { SettingsIcon, ShieldIcon, NetworkIcon, BellIcon, SaveIcon } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Raptor Dashboard',
      language: 'English',
      timezone: 'UTC',
      theme: 'dark'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    },
    network: {
      maxConnections: 1000,
      timeout: 30,
      retryAttempts: 3,
      bufferSize: 8192
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      smsAlerts: false,
      webhookUrl: ''
    }
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would typically send the settings to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your dashboard preferences and system settings</p>
        </div>

        <div className="grid gap-6">
          {/* General Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <SettingsIcon className="h-6 w-6 text-teal-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">General Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => setSettings({...settings, general: {...settings.general, siteName: e.target.value}})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  value={settings.general.language}
                  onChange={(e) => setSettings({...settings, general: {...settings.general, language: e.target.value}})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Persian">Persian</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <ShieldIcon className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Security Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings({...settings, security: {...settings.security, twoFactorAuth: e.target.checked}})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({...settings, security: {...settings.security, sessionTimeout: parseInt(e.target.value)}})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Network Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <NetworkIcon className="h-6 w-6 text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Network Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Connections</label>
                <input
                  type="number"
                  value={settings.network.maxConnections}
                  onChange={(e) => setSettings({...settings, network: {...settings.network, maxConnections: parseInt(e.target.value)}})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeout (seconds)</label>
                <input
                  type="number"
                  value={settings.network.timeout}
                  onChange={(e) => setSettings({...settings, network: {...settings.network, timeout: parseInt(e.target.value)}})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-yellow-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Alerts</span>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailAlerts}
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailAlerts: e.target.checked}})}
                  className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, pushNotifications: e.target.checked}})}
                  className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <SaveIcon className="h-5 w-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
