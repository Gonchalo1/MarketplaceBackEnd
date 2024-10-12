declare module 'mercadopago' {
    interface Item {
      title: string;
      unit_price: number;
      quantity: number;
    }
  
    interface Preference {
      items: Item[];
      back_urls: {
        success: string;
        failure: string;
        pending: string;
      };
      auto_return: string;
    }
  
    interface PreferenceResponse {
      id: string;
      init_point: string;
      // Puedes agregar más campos según lo necesites
    }
  
    function configure(options: { access_token: string }): void;
  
    const preferences: {
      create(preference: Preference): Promise<PreferenceResponse>;
    };
  
    export { configure, preferences };
  }
  