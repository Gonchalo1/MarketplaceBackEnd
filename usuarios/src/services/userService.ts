const EMAIL = "ejemplo@mail.com";
const PASSWORD = "1234qwer";

const checkUser = async (email: string, password: string): Promise<boolean> => {
    if (email === EMAIL && password === PASSWORD) return true;
    else throw new Error("login invalido");
};

export default checkUser;
