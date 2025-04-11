import { forwardRef, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SocialIcons from './SocialIcons';
import emailjs from '@emailjs/browser';

const Contact = forwardRef(({ darkMode }, ref) => {
    const formRef = useRef(null);
    useEffect(() => {
        emailjs.init("uyOv7WBH0WLmDmJLL"); // Replace with your actual public key
    }, []);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        isError: false,
        message: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formState.name.trim()) newErrors.name = 'Name is required';

        if (!formState.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formState.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));

        // Clear error when user types
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setFormStatus({
            isSubmitting: true,
            isSubmitted: false,
            isError: false,
            message: ''
        });

        try {
            // Replace these with your EmailJS service, template, and user ID
            const serviceId = 'service_wi4hn8f';
            const templateId = 'template_jzo7xlq';
            // const userId = 'YrLsfZsML5bO5dkXRw';

            // For demo purposes, simulate a delay
            await emailjs.sendForm(
                serviceId, 
                templateId, 
                formRef.current
            );

            setFormStatus({
                isSubmitting: false,
                isSubmitted: true,
                isError: false,
                message: 'Thank you for your message! I will get back to you soon.'
            });

            // Reset form after successful submission
            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, isSubmitted: false, message: '' }));
            }, 5000);

        } catch (error) {
            console.error('Error sending email:', error);
            setFormStatus({
                isSubmitting: false,
                isSubmitted: false,
                isError: true,
                message: 'Something went wrong. Please try again or contact me directly via email.'
            });
        }
    };

    return (
        <section
            ref={ref}
            className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            id="contact"
        >
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <SectionHeading title="Get In Touch" />

                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                                Have a project in mind or want to discuss a potential collaboration? I'm always open to new opportunities and challenges. Feel free to reach out!
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <Mail className="text-indigo-400 mr-4" size={22} />
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        bhanushankar474@gmail.com
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="text-indigo-400 mr-4" size={22} />
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        Hyderabad, Telangana 500054
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <SocialIcons />
                            </div>
                        </div>

                        <ContactForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            formState={formState}
                            formStatus={formStatus}
                            errors={errors}
                            darkMode={darkMode}
                            formRef={formRef}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

const ContactForm = ({ handleSubmit, handleChange, formState, formStatus, errors, darkMode, formRef }) => {
    const inputClasses = `w-full ${darkMode ?
        'bg-gray-800 border-gray-700 text-gray-100' :
        'bg-white border-gray-300 text-gray-800'
        } border focus:border-indigo-500 p-3 rounded-lg focus:outline-none transition-colors`;

    const labelClasses = `block ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`;

    const errorClasses = 'text-red-500 text-sm mt-1';

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className={labelClasses}>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className={errorClasses}>{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="subject" className={labelClasses}>Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={inputClasses}
                />
            </div>
            <div>
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    maxLength={500}
                    rows="5"
                    value={formState.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none ${errors.message ? 'border-red-500' : ''}`}
                ></textarea>
                {errors.message && <p className={errorClasses}>{errors.message}</p>}
            </div>

            {/* Status message */}
            {formStatus.message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-md ${formStatus.isError ?
                        'bg-red-100 text-red-700 border border-red-200' :
                        'bg-green-100 text-green-700 border border-green-200'}`}
                >
                    <div className="flex items-center">
                        {formStatus.isError ?
                            <AlertCircle size={18} className="mr-2" /> :
                            <CheckCircle size={18} className="mr-2" />}
                        <p>{formStatus.message}</p>
                    </div>
                </motion.div>
            )}

            <button
                type="submit"
                disabled={formStatus.isSubmitting}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${formStatus.isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
                    }`}
            >
                {formStatus.isSubmitting ? (
                    <>
                        <Loader size={20} className="animate-spin mr-2" />
                        <span>Sending...</span>
                    </>
                ) : 'Send Message'}
            </button>
        </form>
    );
};

Contact.displayName = 'Contact';

export default Contact;