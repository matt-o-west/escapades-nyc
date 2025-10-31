import Card from './Card'

export default function Plans({ activities }: { activities?: any[] }) {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
      <div>Card 4</div>
      <div>Card 5</div>
    </div>
  )
}
