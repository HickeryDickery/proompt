import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) {
      return new Response("Prompts not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();
    await connectToDB();

    const prompts = await Prompt.findById(params.id);

    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }

    prompts.prompt = prompt;
    prompts.tag = tag;

    await prompts.save();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
