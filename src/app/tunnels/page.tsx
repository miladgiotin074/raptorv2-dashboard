'use client';
import { useState } from 'react';
import { WifiIcon, PlayIcon, StopIcon, PlusIcon, TrashIcon, EditIcon } from 'lucide-react';

interface Tunnel {
  id: string;
  name: string;
  localPort: number;
  remoteHost: string;
  remotePort: number;
  protocol: 'TCP' | 'UDP';
  status: 'active' | 'inactive' | 'error';
  bytesTransferred: number;
  connections: number;
}

export default function Tunnels() {
  const [tunnels, setTunnels] = useState<Tunnel[]>([
    {
      id: '1',
      name: 'Web Server Tunnel',
      localPort: 8080,
      remoteHost: 'example.com',
      remotePort: 80,
      protocol: 'TCP',
      status: 'active',
      bytesTransferred: 1024000,
      connections: 15
    },
    {
      id: '2',
      name: 'Database Tunnel',
      localPort: 5432,
      remoteHost: 'db.example.com',
      remotePort: 5432,
      protocol: 'TCP',
      status: 'inactive',
      bytesTransferred: 512000,
      connections: 0
    },
    {
      id: '3',
      name: 'SSH Tunnel',
      localPort: 2222,
      remoteHost: 'server.example.com',
      remotePort: 22,
      protocol: 'TCP',
      status: 'error',
      bytesTransferred: 256000,
      connections: 0
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTunnel, setNewTunnel] = useState({
    name: '',
    localPort: '',
    remoteHost: '',
    remotePort: '',
    protocol: 'TCP' as 'TCP' | 'UDP'
  });

  const toggleTunnel = (id: string) => {
    setTunnels(tunnels.map(tunnel => 
      tunnel.id === id 
        ? { ...tunnel, status: tunnel.status === 'active' ? 'inactive' : 'active' }
        : tunnel
    ));
  };

  const deleteTunnel = (id: string) => {
    setTunnels(tunnels.filter(tunnel => tunnel.id !== id));
  };

  const addTunnel = () => {
    if (newTunnel.name && newTunnel.localPort && newTunnel.remoteHost && newTunnel.remotePort) {
      const tunnel: Tunnel = {
        id: Date.now().toString(),
        name: newTunnel.name,
        localPort: parseInt(newTunnel.localPort),
        remoteHost: newTunnel.remoteHost,
        remotePort: parseInt(newTunnel.remotePort),
        protocol: newTunnel.protocol,
        status: 'inactive',
        bytesTransferred: 0,
        connections: 0
      };
      setTunnels([...tunnels, tunnel]);
      setNewTunnel({ name: '', localPort: '', remoteHost: '', remotePort: '', protocol: 'TCP' });
      setShowAddForm(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tunnels</h1>
            <p className="text-gray-400">Manage your network tunnels and connections</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Tunnel
          </button>
        </div>

        {/* Add Tunnel Form */}
        {showAddForm && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Tunnel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Tunnel Name"
                value={newTunnel.name}
                onChange={(e) => setNewTunnel({...newTunnel, name: e.target.value})}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Local Port"
                value={newTunnel.localPort}
                onChange={(e) => setNewTunnel({...newTunnel, localPort: e.target.value})}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Remote Host"
                value={newTunnel.remoteHost}
                onChange={(e) => setNewTunnel({...newTunnel, remoteHost: e.target.value})}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Remote Port"
                value={newTunnel.remotePort}
                onChange={(e) => setNewTunnel({...newTunnel, remotePort: e.target.value})}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newTunnel.protocol}
                onChange={(e) => setNewTunnel({...newTunnel, protocol: e.target.value as 'TCP' | 'UDP'})}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTunnel}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Tunnel
              </button>
            </div>
          </div>
        )}

        {/* Tunnels List */}
        <div className="grid gap-4">
          {tunnels.map((tunnel) => (
            <div key={tunnel.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <WifiIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{tunnel.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {tunnel.localPort} → {tunnel.remoteHost}:{tunnel.remotePort} ({tunnel.protocol})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tunnel.status)}`}>
                    {tunnel.status.charAt(0).toUpperCase() + tunnel.status.slice(1)}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{formatBytes(tunnel.bytesTransferred)}</p>
                    <p className="text-gray-400 text-sm">{tunnel.connections} connections</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleTunnel(tunnel.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        tunnel.status === 'active' 
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {tunnel.status === 'active' ? <StopIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                    </button>
                    <button className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors">
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTunnel(tunnel.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tunnels.length === 0 && (
          <div className="text-center py-12">
            <WifiIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tunnels configured</h3>
            <p className="text-gray-500">Create your first tunnel to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
