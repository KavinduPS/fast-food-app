import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/libs/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    console.log(email, password);
    if (!email || !password) {
      return Alert.alert("Error", "Please enter valid email and password");
    }
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="items-center">
      <View className="w-full items-center gap-8 py-8">
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
          keyboardType="email-address"
          isSecuredEntry={true}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
        />
        <CustomButton
          buttonText="Sign In"
          isLoading={isSubmitting}
          handlePress={submit}
        />
      </View>
      <View className="w-11/12 flex-row justify-center items-center">
        <Text className="text-lg text-neutral-400">
          Don't have an account?{" "}
        </Text>
        <Link
          href={"/SignUp"}
          className="font-semibold text-primary-500 text-lg"
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
