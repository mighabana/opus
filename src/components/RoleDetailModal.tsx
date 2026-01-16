import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface Milestone {
  title: string;
  description: string;
}

interface Output {
  title: string;
  description: string;
}

interface RoleDetail {
  company: string;
  role: string;
  period: string;
  fullDescription: string;
  milestones: Milestone[];
  outputs: Output[];
  technologies?: string[];
}

interface RoleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleDetail: RoleDetail;
}

export const RoleDetailModal: React.FC<RoleDetailModalProps> = ({
  isOpen,
  onClose,
  roleDetail,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-[#f5ede0] border-orange-500/40 text-black">
        <DialogHeader>
          <DialogTitle className="text-black">{roleDetail.role}</DialogTitle>
          <DialogDescription className="text-gray-700">
            {roleDetail.company} • {roleDetail.period}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Full Description */}
            <div>
              <h3 className="mb-2 text-black">About the Role</h3>
              <p className="text-gray-800 leading-relaxed">
                {roleDetail.fullDescription}
              </p>
            </div>

            {/* Technologies */}
            {roleDetail.technologies && roleDetail.technologies.length > 0 && (
              <div>
                <h4 className="mb-3 text-black">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {roleDetail.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-100 text-gray-800 hover:bg-orange-200 border border-orange-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-orange-200" />

            {/* Milestones */}
            <div>
              <h3 className="mb-4 text-black">Key Milestones</h3>
              <div className="space-y-4">
                {roleDetail.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-2" />
                    <div className="flex-1">
                      <h4 className="mb-1 text-black">{milestone.title}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-orange-200" />

            {/* Outputs */}
            <div>
              <h3 className="mb-4 text-black">Notable Outputs</h3>
              <div className="space-y-4">
                {roleDetail.outputs.map((output, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="mb-2 text-black">{output.title}</h4>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {output.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
