import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        required:false,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLeqsLPT1tjn6erq7O2nrbG0uby/w8bb3t/e4eK5vsHFycvIzM68wcPP09T2uOTLAAADbklEQVR4nO2b23KEIAxAuQQQRf3/vy3spXU7u0qiCZ0p563TlzMhRAhZpTqdTqfT6XQ6nU6n0+l0OqcA58ZYUM5Ba5k7oOI6aO9Nxnsfkh1VczWAddLG6B/yH4NtGzOIyW+VvtX03DBiMOt3UjexYF0jqWg+Sd3EptgiYC7tON2xDbyWvVDd8UnaC8KhVFnIWdZrrLLKXoOkl6u0ko0XLLVWkl6wHmf7xmuU8YLRI6y0DqOIlppQVtqIlAmYMUtY8BLlHrBWWgtUifx5RmMsu1ZtIX1hYj9NoIrDE8+9Gevr+xb2zYisWU+Yaxe+OjyIrFrYUvqE+ctI2oeFwLoXI9FKe1YtS0wt3hIBA1XLcF43HDHjM5w578hWmrOgntDiPEU4amppvfxDLbIV7yL+US3qt4d5JyLurb/grFvkc402rLcf+jeRUerECcKwniDI5y3euw8MxGDx3hRxzZoNzGd5oN18Jl4r4omLv/cWKato+HsjhL0o0NgFSkUV6AcSThEiXXB8pRfp6WJLqlmFWs04K6mHDGTWy0hhvZg/Oy9eqdZLpPn941V7TBV+6XRVTRIv/v5alV8NXqvBHjgZqTeoX15uv64KVdE3YjF8OhX6ocm4wQMXpzcTGkansdFwxgNQcQ4vAy3GByv04Lpv5pRNyxQy0zLMFtoGagM4UGNBAfyBQKmbRtaJ3xS3pnLgnIprGsrylZwypmT/cylvEZQ2yiGy82L8x5mk/K+QbFSCYQMX0xR2p6TuakZPg1USOwBgtItHXK2Nn9bIPPqW4zQE9IUsB21lXEwYV01rQeT1TJHHDFTCB2obsiFen2WfZiYx5K/SxRHbmZlEhezKiIGypyP1xKerPuOgpquk9HUDqfRe/Cex5YoyRn4H/uwVzmYYkJp/h/hzTUu3ckjpMll8Il4wE4t6BYG8I+tuzmQvauKzWmninZs3VjcIWvW9Ijr4bgBw7cEXsPsRIt8e3IAezqO/leNAtTBdxU8HrsEjwkV6QKGBWUby0y/Fq7qPeflRZpf6qUGRXfik9u1FNljVD8aSmVWofPWX24YPqmr9iWEoIlXDn8Rh6hPUvPtTfj1wloqkx/y06CoqDjjS+7BQsRfJo1BntI6TS7w8FJajEiFd4h8cabnh9gNpYQ6n6SHaFhylVqfT6XQ6/5UvpdcqOYZYp6gAAAAASUVORK5CYII=",
    }
},{timestamps:true});
const User=mongoose.model('users',userSchema);

export default User;