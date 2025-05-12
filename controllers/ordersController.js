import db from '../models/index.js';
const { Order, OrderDetail, Product, Refund } = db;

const ordersController = {
  getAllOrders: async (req, res) => {
    const orders = await Order.findAll({
      include: [{
        model: OrderDetail,
        include: [{
          model: Product,
        }],
      },
      {
        model: Refund,
      },
      ],
    });
    res.status(200).json(orders);
  },
  getOrderById: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }
    res.status(200).json(order);
  },
  createOrder: async (req, res) => {
    const { cart, client } = req.body;
    const totalAmount = cart.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0);
    const { name, email } = client;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    try {
      const order = await Order.create({ totalAmount, name, email, status: 'completed' });
      const orderDetails = cart.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      }));
      await OrderDetail.bulkCreate(orderDetails);

      const orderWithDetails = await Order.findByPk(order.id, {
        include: [{ model: OrderDetail, as: 'details' }],
      });
      res.status(201).json(orderWithDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating order' });
    }
  },
  refundOrder: async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
      const order = await Order.findByPk(id, {
        include: [{ model: OrderDetail }],
      });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const amountToRefund = amount || order.totalAmount;

      const refund = await Refund.create({
        orderId: order.id,
        amount: amountToRefund,
        status: 'pending',
      });

      // order.OrderDetail.length > 0 && await RefundDetail.bulkCreate()

      res.status(201).json({ message: 'Refund processed successfully', refund });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing refund' });
    }


    // try {
    //   const order = await Order.findByPk(id);
    //   if (!order) {
    //     return res.status(404).json({ message: 'Order not found' });
    //   }

    //   // Aquí puedes agregar la lógica para procesar el reembolso
    //   // Por ejemplo, llamar a la API de Stripe para realizar el reembolso

    //   // Simulación de reembolso exitoso
    //   order.status = 'refunded';
    //   await order.save();

    //   res.status(200).json({ message: 'Refund processed successfully' });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Error processing refund' });
    // }
  }
};

export default ordersController;