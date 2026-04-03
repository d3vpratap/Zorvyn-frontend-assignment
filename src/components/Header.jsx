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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">FinanceHub</h1>
          </div>

          <div className="flex items-center gap-4">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[130px]" data-testid="role-switcher">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin" data-testid="role-option-admin">
                  Admin
                </SelectItem>
                <SelectItem value="viewer" data-testid="role-option-viewer">
                  Viewer
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="btn-hover"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Avatar data-testid="user-avatar">
              <AvatarImage src="https://images.pexels.com/photos/31880922/pexels-photo-31880922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
