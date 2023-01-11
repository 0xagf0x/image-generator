// use openai library
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size} = req.body;

  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
 
  try {
    const response = await openai.createImage({
      // what displays
      prompt: prompt,
      // number of images
      n: 1,
      // size of image
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
} 

module.exports = {generateImage}