import unittest
from videogameSales import app

class testapp (unittest.TestCase):
    def test_home(self):
        self.assertNotEqual(app, "<Flask 'videogameSales'>")