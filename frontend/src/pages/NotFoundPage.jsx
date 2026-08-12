import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-5xl font-bold text-fg">404</h1>
      <p className="mt-3 text-fg-muted">Сторінку не знайдено</p>
      <Link to="/" className="mt-6 inline-block">
        <Button>На головну</Button>
      </Link>
    </Container>
  );
}
