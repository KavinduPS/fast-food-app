import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/libs/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;
    if (!email || !password || !name) {
      return Alert.alert("Error", "Please enter valid email and password");
    }
    setIsSubmitting(true);
    try {
      await createUser({ name, email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View>
      <View className="w-full items-center gap-8 py-8">
        <CustomInput
          placeholder="Enter your full name"
          value={form.name}
          label="Full Name"
          keyboardType="default"
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        />
        <CustomInput
          placeholder="Enter your email"
          value={form.email}
          label="Email Address"
          keyboardType="email-address"
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        />
        <CustomInput
          placeholder="Enter your password"
          value={form.password}
          label="Password"
          keyboardType="default"
          isSecuredEntry={true}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
        />
        <CustomButton
          buttonText="Sign Up"
          isLoading={isSubmitting}
          handlePress={submit}
        />
      </View>
      <View className="w-11/12 flex-row justify-center items-center">
        <Text className="text-lg text-neutral-400">
          Already have an account?{" "}
        </Text>
        <Link
          href={"/SignIn"}
          className="font-semibold text-primary-500 text-lg"
        >
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
