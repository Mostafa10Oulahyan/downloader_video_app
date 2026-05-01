"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface DownloadCardProps {
  url: string;
  format: "mp3" | "mp4";
  status: "idle" | "processing" | "completed" | "error";
  progress: number;
  downloadUrl?: string;
  error?: string;
  fileSize?: string;
  duration?: string;
}

export function DownloadCard({
  url,
  format,
  status,
  progress,
  downloadUrl,
  error,
  fileSize,
  duration,
}: DownloadCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "processing":
        return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "processing":
        return "Processing your download...";
      case "completed":
        return "Download ready!";
      case "error":
        return "Download failed";
      default:
        return "";
    }
  };

  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <span className="text-lg">{getStatusText()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Display */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Source URL</p>
            <p className="text-sm truncate bg-muted p-2 rounded">{url}</p>
          </div>

          {/* Format Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Format:</span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
              {format}
            </span>
          </div>

          {/* Progress Bar */}
          {status === "processing" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* File Info */}
          {status === "completed" && (fileSize || duration) && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              {fileSize && (
                <div>
                  <p className="text-xs text-muted-foreground">File Size</p>
                  <p className="text-sm font-semibold">{fileSize}</p>
                </div>
              )}
              {duration && (
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold">{duration}</p>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {status === "error" && error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Download Button */}
          {status === "completed" && downloadUrl && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => window.open(downloadUrl, "_blank")}
              >
                <Download className="h-5 w-5" />
                Download {format.toUpperCase()}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
