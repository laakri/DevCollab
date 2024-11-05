import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/skills";

interface SkillsSelectProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillsSelect({
  selectedSkills = [],
  onSkillsChange,
}: SkillsSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    onSkillsChange(updatedSkills);
  };

  const filteredCategories = Object.entries(skillCategories).reduce(
    (acc, [category, skills]) => {
      const filteredSkills = skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredSkills.length > 0) {
        acc[category] = filteredSkills;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedSkills.length === 0
              ? "Select skills..."
              : `${selectedSkills.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <div className="p-2">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {Object.entries(filteredCategories).map(([category, skills]) => (
              <div key={category} className="p-2">
                <div className="text-sm font-medium text-muted-foreground px-2 py-1">
                  {category
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div className="space-y-1">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className={cn(
                        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        selectedSkills.includes(skill) && "bg-accent"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelect(skill);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSkills.includes(skill)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleSelect(skill)}
          >
            {skill}
            <span className="ml-1 text-xs">×</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
