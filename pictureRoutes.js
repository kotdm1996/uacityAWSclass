import express from "express";
import {filterImageFromURL,deleteLocalFiles} from '../util/util.js';

export const router = express.Router();

// Create filter Image
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// /:image_url
router.get( '/filteredimage/', ( req, res ) => {
    // destruct request body
    let {image_url} = req.query;

    console.log('routes/pictureRoutes()::GET::/filteredimage/:image_url');
    console.log(`received ==>${image_url}`);

    if(!image_url){
      return res.status(400).send("Missing required image url!");
    }
    
    let mynewoutpath = 'NO_PATH';
    console.log('before filterImageFromURL(image_url)');
    const tmpdata = filterImageFromURL(image_url);
    tmpdata.then(outpath => {
        console.log('filteredimage ... received file path from utils::filterImageFromURL');
        console.log(outpath); // "Hello from the Promise!"
        //res.status(201).sendFile(outpath);
         mynewoutpath = outpath;
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
      

    
    
    //console.log(`Local file path ==> ${localFilePath}`)
    res.status(201).send(`Finally I received URL for image! ==> ${mynewoutpath}`);
    //res.status(201).sendFile(mynewoutpath);
});

router.get( '/deleteimage/', ( req, res ) => {
    // destruct request body
    let {image_path} = req.query;

    console.log('routes/pictureRoutes()::GET::/deleteimage/:image_path');
    console.log(`received ==>${image_path}`);

    if(!image_path){
      return res.status(400).send("Missing required image path!");
    }
    
    //res.status(201).send(`Finally I received path for image! ==> ${image_path}`);
    res.status(201).sendFile();
    try {
      const files_to_delete = [image_path];  
      deleteLocalFiles(files_to_delete);
    }
    catch (error) {    
        console.log("eleteimage exception");
        reject(error);        
    }

    
} );