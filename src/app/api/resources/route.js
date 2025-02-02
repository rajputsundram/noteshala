import {ConnectDB} from '../../../lib/config/db'
import {writeFile}  from 'fs/promises'
import ResourcesModel from '../../../lib/models/ResourcesModel'
import { title } from "process";
import fs from 'fs';
import path from 'path';

const { NextResponse } = require("next/server");
const LoadDB=async()=>{
    await ConnectDB()
}
LoadDB();

 
// API  Endpoint get all resources


export async function GET(request) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const department = url.searchParams.get("department");
    const category = url.searchParams.get("category");


    // Prepare query object based on received params
    let query = {};
    if (year) query.year = year;
    if (department) query.department = department;
    if (category) query.category = category;

  

    // Fetch resources from the database based on the query
    const resources = await ResourcesModel.find(query);

    // Debugging log: Check the number of resources found
    console.log("Found resources:", resources.length);

    if (resources.length === 0) {
      return NextResponse.json({ message: "No resources found for the given parameters" }, { status: 404 });
    }

    // Return resources as a response
    return NextResponse.json({ resources });

  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}



export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();

        // Handling PDF File
        const pdf = formData.get('pdf');
        let pdfUrl = null;
        if (pdf) {
            const pdfByteData = await pdf.arrayBuffer();
            const pdfBuffer = Buffer.from(pdfByteData);
            const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Correct path
            const pdfPath = path.join(uploadDir, `${timestamp}_${pdf.name}`);
            await writeFile(pdfPath, pdfBuffer);
            pdfUrl = `/uploads/${timestamp}_${pdf.name}`;
        }

        // Handling Image File
        const image = formData.get('image');
        let imgUrl = null;
        if (image) {
            const imageByteData = await image.arrayBuffer();
            const imageBuffer = Buffer.from(imageByteData);
            const imagePath = path.join(process.cwd(), 'public', 'uploads', `${timestamp}_${image.name}`);
            await writeFile(imagePath, imageBuffer);
            imgUrl = `/uploads/${timestamp}_${image.name}`;
        }

        // Construct Resource Data
        const resourcesData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: imgUrl,
            pdf: pdfUrl,
            department:formData.get('department'),
            semester: formData.get('semester'),
            year: formData.get('year'),
            createdAt: new Date(),
        };

        // Save to Database
        await ResourcesModel.create(resourcesData);
        // console.log('Resource saved');
        return NextResponse.json({ success: true, msg: 'Resource Added' });

    } catch (error) {
        console.error('Error in POST API:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}


// Creating  Api End point to delete Blog

export async function DELETE(request) {
    const id=await request.nextUrl.searchParams.get('id');
    console.log(id)
    const blog=await ResourcesModel.findById(id);
     fs.unlink(`./public${blog.image}`,(err)=>{
        if (err) {
            console.error('Error deleting file:', err);
        }
    })

        await ResourcesModel.findByIdAndDelete(id);
        return NextResponse.json({msg:"Blog Deleted"})
  

    
}


// export async function DELETE(request) {
//     try {
//         const id = request.nextUrl.searchParams.get('id');
//         if (!id) {
//             return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
//         }

//         const blog = await BlogModel.findById(id);
//         if (!blog) {
//             return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
//         }

//         if (blog.image) {
//             try {
//                 await fs.unlink(`./public${blog.image}`);
//             } catch (err) {
//                 console.error('Error deleting image file:', err);
//             }
//         }

//         await BlogModel.findByIdAndDelete(id);
//         return NextResponse.json({ msg: 'Blog Deleted' });
//     } catch (err) {
//         console.error('Error handling DELETE request:', err);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }