import { useState } from "react";
import { Settings, X } from "lucide-react";
import type { PomodoroSettings } from "../types/pomodoro";

interface SettingsPanelProps {
  settings: PomodoroSettings;
  onUpdateSettings: (settings: Partial<PomodoroSettings>) => void;
}

export default function SettingsPanel({
  settings,
  onUpdateSettings,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 p-3 bg-white border border-black rounded-full hover:bg-gray-50 transition-colors shadow-md z-40"
        aria-label="Open settings"
      >
        <Settings size={24} />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 font-mono">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Time Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Time (minutes)</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Focus</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.workDuration}
                      onChange={(e) =>
                        onUpdateSettings({
                          workDuration: parseInt(e.target.value),
                        })
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Short Break</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreakDuration}
                      onChange={(e) =>
                        onUpdateSettings({
                          shortBreakDuration: parseInt(e.target.value),
                        })
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Long Break</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.longBreakDuration}
                      onChange={(e) =>
                        onUpdateSettings({
                          longBreakDuration: parseInt(e.target.value),
                        })
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Auto-start Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Auto-start</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Breaks</span>
                    <input
                      type="checkbox"
                      checked={settings.autoStartBreaks}
                      onChange={(e) =>
                        onUpdateSettings({
                          autoStartBreaks: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-black"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Focus Sessions</span>
                    <input
                      type="checkbox"
                      checked={settings.autoStartWork}
                      onChange={(e) =>
                        onUpdateSettings({
                          autoStartWork: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-black"
                    />
                  </label>
                </div>
              </div>

              {/* Sound Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Sound</span>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) =>
                      onUpdateSettings({
                        soundEnabled: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-black"
                  />
                </label>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
