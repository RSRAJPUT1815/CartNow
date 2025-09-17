import { Inngest } from "./client";
import prisma from "@/lib/prisma";

// Inngest function to save user data to the database
export const syncUserCreation = Inngest.createFunction(
  {id : 'sync-user-create'},
  {event:"clerk/user.created"},
  async ({event})=>{
    const {data} = event;
    await prisma.user.create({
        data:{
            id: data.id,
            email: data.email_addresses[0]?.email_address || '',
            firstName: `${data.first_name} ${data.last_name}` || '',
            image: data.image_url || ''
        }
    })
  }
)

//Inngest function to update user data in the database
export const syncUserUpdate = Inngest.createFunction(
    {id: 'sync-user-update'},
    {event: "clerk/user.updated"},
    async ({event})=>{
        const {data} = event;
        await prisma.user.update({
            where : {id: data.id},
            data:{
                email: data.email_addresses[0]?.email_address || '',
                firstName: `${data.first_name} ${data.last_name}` || '',
                image: data.image_url || ''
            }
        })
    }
)

//Inngest function to delete user data from the database
export const syncUserDeletion = Inngest.createFunction(
    {id: 'sync-user-delete'},
    {event: "clerk/user.deleted"},
    async ({event})=>{
        const {data} = event;
        await prisma.user.delete({
            where: {id: data.id}
        })
    }
)
