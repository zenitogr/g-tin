import AIChatbot from '../components/AIChatbot';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold p-4">g-tin AI Chatbot</h1>
      <div className="flex-grow overflow-hidden">
        <AIChatbot />
      </div>
    </div>
  );
}
