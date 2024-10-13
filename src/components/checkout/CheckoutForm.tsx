'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import Navbar from '../navbar/navbar'

interface CheckoutFormProps {
  id_buyer: string;
  id_photographer: string;
  total: number;
  id_payment: string;
  status: string;
  orderNumber: string;
}

export default function CheckoutForm({
  id_buyer,
  id_photographer,
  total,
  id_payment,
  status,
  orderNumber
}: CheckoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)

    try {
      // Here would be your payment confirmation logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulates an API call

      // Redirect to the confirmation page
      router.push(`/checkout/confirmation/${id_buyer}/${total}/${id_payment}/${status}/${orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <Navbar onMenuClick={() => console.log('Menu clicked')} />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-[350px] shadow-md">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="text-4xl font-harmoni">Surf Photo Checkout</CardTitle>
            <CardDescription className="text-blue-100 text-x1 font-harmoni">Complete your purchase</CardDescription>
          </CardHeader>
          <CardContent className="mt-4 space-y-2">
            <p className="text-lg text-gray-600 font-harmoni">Order Number: {orderNumber}</p>
            <p className="text-lg text-gray-600 font-harmoni">Photographer ID: {id_photographer}</p>
            <p className="text-lg text-gray-600 font-harmoni">Payment ID: {id_payment}</p>
            <p className="text-lg text-gray-600 font-harmoni">Status: {status}</p>
            <p className="text-2x1 font-semibold text-gray-800 mt-2 font-harmoni">Total: ${total.toFixed(2)}</p>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-1/2 mr-2">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={loading}
              className="w-1/2 bg-blue-500 text-white hover:bg-blue-600"
            >
              {loading ? 'Processing...' : 'Confirm'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}