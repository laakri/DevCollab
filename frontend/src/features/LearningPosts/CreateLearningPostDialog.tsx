import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateLearningPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateLearningPostDialog = ({
  open,
  onOpenChange,
}: CreateLearningPostDialogProps) => {
  const [formData, setFormData] = useState({
    content: "",
    teachingInterests: "",
    learningInterests: "",
    availability: "",
    preferredLanguages: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement post creation
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Learning Post</DialogTitle>
          <DialogDescription>
            Share what you want to learn and teach
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="Describe what you want to learn or teach..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teachingInterests">Teaching Interests</Label>
            <Input
              id="teachingInterests"
              placeholder="e.g., React, TypeScript, Node.js"
              value={formData.teachingInterests}
              onChange={(e) =>
                setFormData({ ...formData, teachingInterests: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="learningInterests">Learning Interests</Label>
            <Input
              id="learningInterests"
              placeholder="e.g., Python, Machine Learning"
              value={formData.learningInterests}
              onChange={(e) =>
                setFormData({ ...formData, learningInterests: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Input
              id="availability"
              placeholder="e.g., Evenings EST, Weekends"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredLanguages">Preferred Languages</Label>
            <Input
              id="preferredLanguages"
              placeholder="e.g., English, Spanish"
              value={formData.preferredLanguages}
              onChange={(e) =>
                setFormData({ ...formData, preferredLanguages: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLearningPostDialog;
