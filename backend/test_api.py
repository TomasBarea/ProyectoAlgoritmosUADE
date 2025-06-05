import unittest
import json
from app import app

class TestAPI(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_filtrar(self):
        response = self.client.get('/api/filtrar?precio=20000')
        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        for producto in data:
            self.assertLess(producto["precio"], 20000)

    def test_validar_valido(self):
        response = self.client.get('/api/validar?usuario=Juan Perez&clave=abcdef')
        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data)
        self.assertIn("mensaje", data)
        self.assertEqual(data["mensaje"], "Datos válidos ✅")

    def test_validar_invalido(self):
        response = self.client.get('/api/validar?usuario=123&clave=abc')
        self.assertEqual(response.status_code, 400)

        data = json.loads(response.data)
        self.assertIn("errores", data)
        self.assertTrue(len(data["errores"]) > 0)

    
    def test_cart_post_get_delete(self):
        item = {"id": 1, "nombre": "Zapatilla", "cantidad": 2}

     
        post_resp = self.client.post('/api/cart',
                                     data=json.dumps({"item": item}),
                                     content_type='application/json')
        self.assertEqual(post_resp.status_code, 200)
        post_data = json.loads(post_resp.data)
        self.assertIn("cart", post_data)

        # GET - obtener carrito
        get_resp = self.client.get('/api/cart')
        self.assertEqual(get_resp.status_code, 200)
        get_data = json.loads(get_resp.data)
        self.assertIn(item, get_data["cart"])


        del_resp = self.client.delete('/api/cart',
                                      data=json.dumps({"item": item}),
                                      content_type='application/json')
        self.assertEqual(del_resp.status_code, 200)
        del_data = json.loads(del_resp.data)
        self.assertNotIn(item, del_data["cart"])

if __name__ == '__main__':
    unittest.main()
