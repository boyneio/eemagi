import PhotoPanel from './PhotoPanel';
import {handlers} from './PhotoPanel.handlers';

export const PhotoHandler = () => <PhotoPanel />;

PhotoHandler.story = {
  parameters: {
    msw: [
      handlers
    ]
  },
};