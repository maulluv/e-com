import { Container } from "../components/ui/Container";
import { OrderHistory } from "../components/account/OrderHistory";

/**
 * Особистий кабінет. Поки простий: лише історія замовлень.
 * Логін/реєстрацію та решту даних додамо пізніше.
 */
export function AccountPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold text-fg">Особистий кабінет</h1>
      <p className="mt-2 text-fg-muted">Історія ваших замовлень</p>

      <div className="mt-8">
        <OrderHistory />
      </div>
    </Container>
  );
}
