export const dictionary = {
    es: {
        navbar: {
            home: 'Inicio',
            search: 'Buscar Cuidador',
            becomeSitter: 'Ser Cuidador',
            login: 'Iniciar Sesión',
            signup: 'Registrarse',
            logout: 'Cerrar Sesión',
            welcome: 'Bienvenido',
            profile: 'Mi Perfil'
        },
        home: {
            heroTitle: 'Cuidado de mascotas premium, cuando lo necesitas',
            heroSubtitle: 'Encuentra cuidadores confiables y verificados en tu zona para paseos, hospedaje y visitas a domicilio.',
            findSitter: 'Encuentra un Cuidador',
            howItWorks: 'Cómo Funciona',
            step1Title: 'Busca',
            step1Desc: 'Navega por perfiles de cuidadores verificados en tu área.',
            step2Title: 'Reserva',
            step2Desc: 'Contacta y reserva el servicio perfecto para tu mascota.',
            step3Title: 'Relájate',
            step3Desc: 'Disfruta de tu tiempo mientras tu mascota recibe el mejor cuidado.'
        },
        auth: {
            loginTitle: 'Iniciar Sesión',
            emailLabel: 'Correo Electrónico',
            passwordLabel: 'Contraseña',
            submitLogin: 'Ingresar',
            noAccount: '¿No tienes cuenta?',
            registerHere: 'Regístrate aquí',
            registerTitle: 'Crear Cuenta',
            nameLabel: 'Nombre Completo',
            confirmPasswordLabel: 'Confirmar Contraseña',
            submitRegister: 'Registrarse',
            alreadyAccount: '¿Ya tienes cuenta?',
            loginHere: 'Inicia sesión aquí'
        },
        profile: {
            title: 'Mi Perfil',
            subtitle: 'Gestiona tu información personal y ubicación',
            tabs: {
                view: 'Ver Perfil',
                edit: 'Editar Datos',
                sitter: 'Info Cuidador'
            },
            basicInfo: 'Información Básica',
            name: 'Nombre',
            email: 'Email',
            type: 'Tipo',
            location: 'Ubicación',
            sitterProfile: 'Perfil de Cuidador',
            noBio: 'No has escrito una biografía aún.',
            editProfile: 'Editar Perfil',
            saveChanges: 'Guardar Cambios',
            saving: 'Guardando...',
            success: '¡Perfil actualizado con éxito!',
            error: 'Error al actualizar el perfil'
        },
        common: {
            loading: 'Cargando...',
            error: 'Ocurrió un error',
            owner: 'Dueño de Mascota',
            sitter: 'Cuidador',
            both: 'Ambos'
        }
    },
    en: {
        navbar: {
            home: 'Home',
            search: 'Find Sitter',
            becomeSitter: 'Become a Sitter',
            login: 'Log In',
            signup: 'Sign Up',
            logout: 'Log Out',
            welcome: 'Welcome',
            profile: 'My Profile'
        },
        home: {
            heroTitle: 'Premium pet care, when you need it',
            heroSubtitle: 'Find reliable and verified sitters in your area for walks, boarding, and home visits.',
            findSitter: 'Find a Sitter',
            howItWorks: 'How It Works',
            step1Title: 'Search',
            step1Desc: 'Browse verified sitter profiles in your area.',
            step2Title: 'Book',
            step2Desc: 'Contact and book the perfect service for your pet.',
            step3Title: 'Relax',
            step3Desc: 'Enjoy your time while your pet receives the best care.'
        },
        auth: {
            loginTitle: 'Log In',
            emailLabel: 'Email Address',
            passwordLabel: 'Password',
            submitLogin: 'Log In',
            noAccount: 'Don\'t have an account?',
            registerHere: 'Register here',
            registerTitle: 'Create Account',
            nameLabel: 'Full Name',
            confirmPasswordLabel: 'Confirm Password',
            submitRegister: 'Sign Up',
            alreadyAccount: 'Already have an account?',
            loginHere: 'Log in here'
        },
        profile: {
            title: 'My Profile',
            subtitle: 'Manage your personal information and location',
            tabs: {
                view: 'View Profile',
                edit: 'Edit Details',
                sitter: 'Sitter Info'
            },
            basicInfo: 'Basic Information',
            name: 'Name',
            email: 'Email',
            type: 'Type',
            location: 'Location',
            sitterProfile: 'Sitter Profile',
            noBio: 'You haven\'t written a bio yet.',
            editProfile: 'Edit Profile',
            saveChanges: 'Save Changes',
            saving: 'Saving...',
            success: 'Profile updated successfully!',
            error: 'Error updating profile'
        },
        common: {
            loading: 'Loading...',
            error: 'An error occurred',
            owner: 'Pet Owner',
            sitter: 'Sitter',
            both: 'Both'
        }
    }
};

export type Language = 'es' | 'en';
export type Dictionary = typeof dictionary.es;
