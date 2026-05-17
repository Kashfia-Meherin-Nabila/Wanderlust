"use client";
import { Card } from "@heroui/react";
import React from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
    const onSubmit =async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const {data, error} = await authClient.signUp.email({
            email: user.email,
            password :user.password,
            name:user.name,
            image:user.image
        })
        if(data){
   toast.success("Account Created Successfully!");
   router.push("/");
}
        if(error){
            toast.error("Something went wrong")

        }
        console.log(user);
    }
  return (
    <div className="max-w-5xl mx-auto my-20">
        <div className="text-center">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p>Start your adventure with Wanderlust</p>
        </div>
      <Card>
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField
            isRequired
            name="name"
            type="text"
            
          >
            <Label>Name</Label>
            <Input placeholder="Type your name" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="image"
            type="url"
            
          >
            <Label>Image</Label>
            <Input placeholder="Image URL" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button className={'rounded-none w-full bg-cyan-500'} type="submit">
              Submit
            </Button>
            
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
