import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();


cloudinary.v2.config({
    cloud_name: 'dfir5drnr',
    api_key: '355786555135944',
    api_secret: 'Vqz4K5t42zWcA4tcWN1CCg-mGeo',
  });
  

router.get('/', async (req, res) => {
  try {
    const result = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'uploads/', 
      resource_type: 'image',
      max_results: 20, 
    });

    
    const imageUrls = result.resources.map(resource => resource.secure_url);

    
    res.json(imageUrls);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
});

export default router;
