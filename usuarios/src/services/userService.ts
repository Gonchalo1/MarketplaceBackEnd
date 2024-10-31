import { createConnection } from '../database/Connection'; 

const checkUser = async (email: string, password: string, username: string): Promise<boolean> => {
    const client = await createConnection();

    try {
        const query = 'SELECT * FROM users WHERE email = $1 AND password = $2 AND username = $3';
        const values = [email, password, username];
        const result = await client.query(query, values);
    
        if (result.rows.length > 0) {
          return true;
        } else {
          throw new Error("Login inválido");
        }
      } catch (error) {
        console.error('Error en checkUser:', error);
        throw new Error('Error al verificar el usuario');
      } finally {
        await client.end(); 
      }
    };
    
    export default checkUser;



