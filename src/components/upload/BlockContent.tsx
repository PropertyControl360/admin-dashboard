import { Box, Stack, Typography } from '@mui/material';

interface Props {
  description: string | undefined;
  dropZoneStyle? : {
    variants :  'subtitle2' | 'body2',
    padding : number
  };
}

function BlockContent( { description, dropZoneStyle}: Props ) {
  console.log(dropZoneStyle, "inside the Block context")

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    >
     

      <Box sx={{ p: dropZoneStyle && dropZoneStyle.padding ? dropZoneStyle.padding : 3 }}>
        <Typography gutterBottom variant={dropZoneStyle && dropZoneStyle.variants ? dropZoneStyle.variants : "h5"}>
         {description}
        </Typography>
      </Box>
    </Stack>
  );
}

export default BlockContent;
