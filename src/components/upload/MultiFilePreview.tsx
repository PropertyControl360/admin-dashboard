import React, { useState } from 'react';

import isString from 'lodash/isString';
import { Button, List, IconButton, ListItem, ListItemText, Stack, Modal, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {m, AnimatePresence} from 'framer-motion';

import { fData } from 'src/utils/format-number';

import Iconify from '../iconify';
import Image from '../image/image';
import { varFade } from '../animate';
import FileThumbnail from '../file-thumbnail';

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface MultiFilePreviewProps {
  files: string[] | CustomFile[];
  showPreview?: boolean;
  onRemove: (file: string | CustomFile) => void;
  onRemoveAll: () => void;
}

const getFileData = (file: string | CustomFile) => {
  if (typeof file === 'string') {
    return { key: file };
  }
  return {
    key: file.name,
    name: file.name,
    size: file.size,
    preview: file.preview,
  };
};

const MultiFilePreview = ({
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
}: MultiFilePreviewProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const handleMouseEnter = (key: string) => setHovered(key);
  const handleMouseLeave = () => setHovered(null);

  const openImageModal = (imageSrc?: string) => {
    setSelectedImage(imageSrc);
    setOpenModal(true);
  };

  const closeImageModal = () => setOpenModal(false);
  const hasFile = files?.length > 0;
  return (
    <>
      <List disablePadding sx={{ ...(files?.length > 0 && { my: 3 }) }}>
        <AnimatePresence>
          {hasFile && files?.map((file) => {
            const { key, name, size, preview } = getFileData(file);
            const imageSrc = isString(file) ? file : preview;

            if (showPreview) {
              return (
                <ListItem
                  key={key}
                  component={m.div}
                  {...varFade().inRight}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.25,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'inline-flex',
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openImageModal(imageSrc)}
                >
                  <Image alt="preview" src={imageSrc} ratio="1/1" />
                  {hovered === key && (
                    <IconButton
                      size="small"
                      onClick={(event) => { event.stopPropagation(); onRemove(file); }}
                      sx={{
                        top: 6,
                        p: '2px',
                        right: 6,
                        position: 'absolute',
                        color: 'common.white',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                        },
                      }}
                    >
                      <Iconify icon="eva:close-fill" />
                    </IconButton>
                  )}
                </ListItem>
              );
            }

            return (
              <ListItem
                key={key}
                component={m.div}
                {...varFade().inRight}
                sx={{
                  my: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 0.75,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <FileThumbnail file={file} />
                <ListItemText
                  primary={isString(file) ? file : name}
                  secondary={isString(file) ? '' : fData(size || 0)}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                  <Iconify icon="eva:close-fill" />
                </IconButton>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      {hasFile && files.length > 1 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
        </Stack>
      )}

      
      <Modal open={openModal} onClose={closeImageModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ outline: 'none' }}>
          <img src={selectedImage} alt="Full Size" style={{ maxWidth: '100%', maxHeight: '90vh' }} />
        </Box>
      </Modal>
    </>
  );
};

export default MultiFilePreview;
