"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/molecules/Header";
import CustomButton from "@/components/atoms/CustomButton";
import Modal from "@/components/atoms/Modal";
import TextField from "@/components/molecules/TextField";
import TextArea from "@/components/molecules/TextArea";
import SelectField from "@/components/molecules/SelectField";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";

interface Roundtable {
  id: string;
  name: string;
  event: any;
  session: any;
  topic: string;
  description?: string;
  moderator?: any;
  participants: any[];
  maxParticipants: number;
  startTime: string;
  endTime: string;
  status: "scheduled" | "active" | "completed" | "cancelled";
  meetingLink?: string;
  iceBreakerPrompts: { prompt: string }[];
}

interface Event {
  id: string;
  name: string;
  date: string;
}

interface Session {
  id: string;
  name: string;
  event: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
}

export default function RoundtablesAdmin() {
  const router = useRouter();
  const [roundtables, setRoundtables] = useState<Roundtable[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoundtable, setEditingRoundtable] = useState<Roundtable | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    event: "",
    session: "",
    topic: "",
    description: "",
    moderator: "",
    maxParticipants: 8,
    startTime: "",
    endTime: "",
    status: "scheduled" as const,
    meetingLink: "",
    iceBreakerPrompts: [{ prompt: "" }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roundtablesRes, eventsRes, sessionsRes, usersRes] = await Promise.all([
        fetch("/api/roundtables"),
        fetch("/api/events"),
        fetch("/api/sessions"),
        fetch("/api/users"),
      ]);

      const [roundtablesData, eventsData, sessionsData, usersData] = await Promise.all([
        roundtablesRes.json(),
        eventsRes.json(),
        sessionsRes.json(),
        usersRes.json(),
      ]);

      setRoundtables(roundtablesData.docs || []);
      setEvents(eventsData.docs || []);
      setSessions(sessionsData.docs || []);
      setUsers(usersData.docs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRoundtable(null);
    setFormData({
      name: "",
      event: "",
      session: "",
      topic: "",
      description: "",
      moderator: "",
      maxParticipants: 8,
      startTime: "",
      endTime: "",
      status: "scheduled",
      meetingLink: "",
      iceBreakerPrompts: [{ prompt: "" }],
    });
    setModalOpen(true);
  };

  const handleEdit = (roundtable: Roundtable) => {
    setEditingRoundtable(roundtable);
    setFormData({
      name: roundtable.name,
      event: roundtable.event?.id || "",
      session: roundtable.session?.id || "",
      topic: roundtable.topic,
      description: roundtable.description || "",
      moderator: roundtable.moderator?.id || "",
      maxParticipants: roundtable.maxParticipants,
      startTime: roundtable.startTime ? new Date(roundtable.startTime).toISOString().slice(0, 16) : "",
      endTime: roundtable.endTime ? new Date(roundtable.endTime).toISOString().slice(0, 16) : "",
      status: roundtable.status,
      meetingLink: roundtable.meetingLink || "",
      iceBreakerPrompts: roundtable.iceBreakerPrompts.length > 0 ? roundtable.iceBreakerPrompts : [{ prompt: "" }],
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingRoundtable 
        ? `/api/roundtables/${editingRoundtable.id}`
        : "/api/roundtables";
      
      const method = editingRoundtable ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          iceBreakerPrompts: formData.iceBreakerPrompts.filter(p => p.prompt.trim()),
        }),
      });

      if (response.ok) {
        setModalOpen(false);
        fetchData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to save roundtable"}`);
      }
    } catch (error) {
      console.error("Error saving roundtable:", error);
      alert("Failed to save roundtable");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this roundtable?")) return;

    try {
      const response = await fetch(`/api/roundtables/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        alert("Failed to delete roundtable");
      }
    } catch (error) {
      console.error("Error deleting roundtable:", error);
      alert("Failed to delete roundtable");
    }
  };

  const addIceBreakerPrompt = () => {
    setFormData(prev => ({
      ...prev,
      iceBreakerPrompts: [...prev.iceBreakerPrompts, { prompt: "" }],
    }));
  };

  const removeIceBreakerPrompt = (index: number) => {
    setFormData(prev => ({
      ...prev,
      iceBreakerPrompts: prev.iceBreakerPrompts.filter((_, i) => i !== index),
    }));
  };

  const updateIceBreakerPrompt = (index: number, prompt: string) => {
    setFormData(prev => ({
      ...prev,
      iceBreakerPrompts: prev.iceBreakerPrompts.map((item, i) => 
        i === index ? { ...item, prompt } : item
      ),
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => router.back()} title="Roundtables Admin" />
        <div className="p-6">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={() => router.back()} title="Roundtables Admin" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Roundtables Management</h1>
          <CustomButton onClick={handleCreate} variant="primary">
            Create Roundtable
          </CustomButton>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roundtables.map((roundtable) => (
                  <tr key={roundtable.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {roundtable.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {roundtable.event?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {roundtable.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {roundtable.participants?.length || 0}/{roundtable.maxParticipants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(roundtable.status)}`}>
                        {roundtable.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(roundtable)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(roundtable.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingRoundtable ? "Edit Roundtable" : "Create Roundtable"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Roundtable Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />

            <SelectField
              label="Event"
              value={formData.event}
              onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
              required
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} - {new Date(event.date).toLocaleDateString()}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Session"
              value={formData.session}
              onChange={(e) => setFormData(prev => ({ ...prev, session: e.target.value }))}
              required
            >
              <option value="">Select a session</option>
              {sessions
                .filter(session => session.event === formData.event)
                .map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.name}
                  </option>
                ))}
            </SelectField>

            <TextField
              label="Topic"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              required
            />

            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />

            <SelectField
              label="Moderator"
              value={formData.moderator}
              onChange={(e) => setFormData(prev => ({ ...prev, moderator: e.target.value }))}
            >
              <option value="">Select a moderator</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName} ({user.email})
                </option>
              ))}
            </SelectField>

            <TextField
              label="Max Participants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
              min="2"
              max="20"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Start Time"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
              <TextField
                label="End Time"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                required
              />
            </div>

            <SelectField
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            >
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </SelectField>

            <TextField
              label="Meeting Link"
              value={formData.meetingLink}
              onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
              placeholder="https://zoom.us/j/..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ice Breaker Prompts
              </label>
              {formData.iceBreakerPrompts.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item.prompt}
                    onChange={(e) => updateIceBreakerPrompt(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter ice breaker prompt"
                  />
                  <button
                    type="button"
                    onClick={() => removeIceBreakerPrompt(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIceBreakerPrompt}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add Ice Breaker Prompt
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <FormSubmitButton type="submit">
                {editingRoundtable ? "Update Roundtable" : "Create Roundtable"}
              </FormSubmitButton>
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
