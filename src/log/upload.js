export const handleFileUpload = (req, res) => {
    try {
      const fileUrl = req.file.path;
      res.status(200).json({ url: fileUrl });
      console.log("Image uploaded successfully:", fileUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  };
  