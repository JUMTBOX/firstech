import { LoginForm } from "./LoginForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "LoginPage UI Templates",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    pw: { control: "text" },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form1: Story = {
  args: {
    id: "",
    pw: "",
  },
};
