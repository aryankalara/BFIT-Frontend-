import { Settings as SettingsIcon, Bell, Lock, Eye, Globe, Moon, Volume2, Languages } from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Account Settings',
      icon: Lock,
      settings: [
        { name: 'Change Password', description: 'Update your password' },
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security', toggle: true },
        { name: 'Login History', description: 'View your recent login activity' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Push Notifications', description: 'Get notified about your activities', toggle: true },
        { name: 'Email Notifications', description: 'Receive updates via email', toggle: true },
        { name: 'Weekly Report', description: 'Get weekly progress summary', toggle: true },
      ]
    },
    {
      title: 'Privacy',
      icon: Eye,
      settings: [
        { name: 'Profile Visibility', description: 'Control who can see your profile', toggle: true },
        { name: 'Activity Status', description: 'Show when you\'re active', toggle: true },
        { name: 'Data Sharing', description: 'Manage how your data is shared', toggle: true },
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      settings: [
        { name: 'Language', description: 'Choose your preferred language', options: ['English', 'Spanish', 'French'] },
        { name: 'Dark Mode', description: 'Toggle dark/light theme', toggle: true },
        { name: 'Sound Effects', description: 'Enable/disable sound effects', toggle: true },
      ]
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-500 rounded-full">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <div key={index} className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">{setting.name}</h3>
                      <p className="text-gray-400 text-sm">{setting.description}</p>
                    </div>
                    <div>
                      {setting.toggle ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-black/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      ) : setting.options ? (
                        <select className="bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                          {setting.options.map((option, optIdx) => (
                            <option key={optIdx} value={option.toLowerCase()}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <button className="text-red-400 hover:text-red-300">
                          View
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Moon, label: 'Dark Mode', enabled: true },
                { icon: Volume2, label: 'Sound Effects', enabled: false },
                { icon: Bell, label: 'Notifications', enabled: true },
                { icon: Languages, label: 'Language: English', enabled: true },
              ].map((setting, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                    setting.enabled
                      ? 'bg-red-500/20 text-white'
                      : 'bg-black/30 text-gray-400'
                  }`}
                >
                  <setting.icon className="w-5 h-5" />
                  <span>{setting.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 rounded-lg bg-black/30 text-white hover:bg-black/40 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;