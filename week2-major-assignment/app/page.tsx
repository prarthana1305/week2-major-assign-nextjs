// app/page.tsx
import { Sidebar } from "./components/Sidebar"; // Adjust the path if necessary

export default function Page() {
  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }} className="flex">
      <Sidebar />
    </div>
  );
}
