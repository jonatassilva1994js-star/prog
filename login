 /* --- TELAS DE AUTENTICAÇÃO (LOGIN, RECOVERY, CADASTRO) --- */
        .auth-box {
            max-width: 340px;
            width: 100%;
        }

        .logo-container-login {
            text-align: center;
            margin-bottom: 25px;
        }

        .logo-container-login p {
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 3px;
            margin-top: 8px;
            color: #ffffff;
        }

        .auth-box label {
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 5px;
            letter-spacing: 1px;
            color: #ffffff;
            text-align: center;
            width: 100%;
            display: block;
        }

        .auth-box input, .auth-box select {
            width: 100%;
            height: 38px;
            padding: 0 15px;
            font-size: 12px;
            text-align: center;
            border: none;
            outline: none;
            border-radius: 19px;
            margin-bottom: 14px;
            background-color: #ffffff;
            color: #333333;
            font-weight: 700;
        }

        .auth-box input::placeholder {
            color: #b0b0b0;
            font-weight: 500;
        }

        .btn-auth {
            width: 100%;
            height: 40px;
            background-color: #ffc800;
            color: #000000;
            font-size: 14px;
            font-weight: 900;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 5px;
            letter-spacing: 1px;
            transition: background-color 0.2s;
        }

        .btn-auth:hover { background-color: #e6b200; }

        .auth-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-top: 15px;
        }

        .auth-link {
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: color 0.2s;
        }

        .auth-link:hover {
            color: #ffc800;
        }