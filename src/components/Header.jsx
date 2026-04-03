import React from "react";
import { useAppContext } from "../context/AppContext";
import { Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Header = () => {
  const { theme, toggleTheme, role, setRole } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">F</span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              FinanceHub
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[90px] sm:w-[130px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent
                position="popper"
                className="z-[100] bg-white dark:bg-gray-900 border shadow-md"
              >
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src="https://images.pexels.com/photos/31880922/pexels-photo-31880922.jpeg" />
              <AvatarFallback>
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
