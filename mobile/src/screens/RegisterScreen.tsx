/**
 * Register Screen Component
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { registerUser, clearError } from '@/store/slices/authSlice';
import { COLORS, TYPOGRAPHY, SPACING } from '@/utils/constants';

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, hyphens, and underscores';
            isValid = false;
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one letter and one number';
            isValid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            await dispatch(registerUser({
                email: formData.email.trim(),
                username: formData.username.trim(),
                password: formData.password,
                confirm_password: formData.confirmPassword,
                first_name: formData.firstName.trim() || undefined,
                last_name: formData.lastName.trim() || undefined,
            })).unwrap();

            Alert.alert(
                'Registration Successful!',
                'Your account has been created. Please sign in to continue.',
                [
                    {
                        text: 'Sign In',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert('Registration Failed', error || 'Please try again.');
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        // Clear errors when component mounts
        dispatch(clearError());
    }, [dispatch]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Join RecycleQuest!</Text>
                    <Text style={styles.subtitle}>Create your account and start your eco-journey</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email *</Text>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            value={formData.email}
                            onChangeText={(value) => updateFormData('email', value)}
                            placeholder="Enter your email"
                            placeholderTextColor={COLORS.TEXT_DISABLED}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username *</Text>
                        <TextInput
                            style={[styles.input, errors.username ? styles.inputError : null]}
                            value={formData.username}
                            onChangeText={(value) => updateFormData('username', value)}
                            placeholder="Choose a username"
                            placeholderTextColor={COLORS.TEXT_DISABLED}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.firstName}
                                onChangeText={(value) => updateFormData('firstName', value)}
                                placeholder="First name"
                                placeholderTextColor={COLORS.TEXT_DISABLED}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.lastName}
                                onChangeText={(value) => updateFormData('lastName', value)}
                                placeholder="Last name"
                                placeholderTextColor={COLORS.TEXT_DISABLED}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password *</Text>
                        <TextInput
                            style={[styles.input, errors.password ? styles.inputError : null]}
                            value={formData.password}
                            onChangeText={(value) => updateFormData('password', value)}
                            placeholder="Create a password"
                            placeholderTextColor={COLORS.TEXT_DISABLED}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password *</Text>
                        <TextInput
                            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                            value={formData.confirmPassword}
                            onChangeText={(value) => updateFormData('confirmPassword', value)}
                            placeholder="Confirm your password"
                            placeholderTextColor={COLORS.TEXT_DISABLED}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                    </View>

                    <TouchableOpacity
                        style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text style={styles.registerButtonText}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.LG,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.XXL,
    },
    title: {
        fontSize: TYPOGRAPHY.FONT_SIZE.XXXL,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
        marginBottom: SPACING.SM,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        color: COLORS.TEXT_SECONDARY,
        textAlign: 'center',
    },
    form: {
        marginBottom: SPACING.XXL,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    inputContainer: {
        marginBottom: SPACING.LG,
    },
    label: {
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        fontWeight: '600',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: SPACING.SM,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.GRAY_MEDIUM,
        borderRadius: 8,
        padding: SPACING.MD,
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        backgroundColor: COLORS.WHITE,
    },
    inputError: {
        borderColor: COLORS.ERROR,
    },
    errorText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.SM,
        color: COLORS.ERROR,
        marginTop: SPACING.XS,
    },
    registerButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 8,
        padding: SPACING.MD,
        alignItems: 'center',
        marginTop: SPACING.MD,
    },
    registerButtonDisabled: {
        backgroundColor: COLORS.GRAY_MEDIUM,
    },
    registerButtonText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.LG,
        fontWeight: '600',
        color: COLORS.WHITE,
    },
    errorContainer: {
        marginTop: SPACING.MD,
        padding: SPACING.MD,
        backgroundColor: COLORS.ERROR + '20',
        borderRadius: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        color: COLORS.TEXT_SECONDARY,
    },
    footerLink: {
        fontSize: TYPOGRAPHY.FONT_SIZE.MD,
        color: COLORS.PRIMARY,
        fontWeight: '600',
    },
});