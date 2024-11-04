import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  ScreenShare,
  Users,
} from "lucide-react";

export const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const participants = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://github.com/shadcn.png",
      isSpeaking: true,
    },
    {
      id: 2,
      name: "You",
      isMuted: isMuted,
      isVideoOff: !isVideoOn,
    },
  ];

  return (
    <div className="relative">
      {/* Call Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant={isMuted ? "destructive" : "outline"}
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant={!isVideoOn ? "destructive" : "outline"}
          size="icon"
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {!isVideoOn ? (
            <VideoOff className="h-4 w-4" />
          ) : (
            <Video className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant={isScreenSharing ? "secondary" : "outline"}
          size="icon"
          onClick={() => setIsScreenSharing(!isScreenSharing)}
        >
          <ScreenShare className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowParticipants(!showParticipants)}
        >
          <Users className="h-4 w-4" />
        </Button>

        <Button variant="destructive" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
      </div>

      {/* Participants Panel */}
      <AnimatePresence>
        {showParticipants && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 w-[300px] bg-background rounded-lg border shadow-lg p-4"
          >
            <h3 className="font-semibold mb-4">Participants (2)</h3>
            <div className="space-y-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>
                        {participant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {participant.name}
                      </div>
                      {participant.isSpeaking && (
                        <div className="text-xs text-muted-foreground">
                          Speaking...
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {participant.isMuted && <MicOff className="h-4 w-4" />}
                    {participant.isVideoOff && <VideoOff className="h-4 w-4" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
