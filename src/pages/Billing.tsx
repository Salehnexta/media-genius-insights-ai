
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Download, 
  Receipt, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  downloadUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

const Billing: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 299.99,
      status: 'paid',
      description: isArabic ? 'خطة احترافية - يناير 2024' : 'Pro Plan - January 2024'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-01',
      amount: 299.99,
      status: 'paid',
      description: isArabic ? 'خطة احترافية - ديسمبر 2023' : 'Pro Plan - December 2023'
    },
    {
      id: 'INV-2024-003',
      date: '2024-02-15',
      amount: 299.99,
      status: 'pending',
      description: isArabic ? 'خطة احترافية - فبراير 2024' : 'Pro Plan - February 2024'
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '1234',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5678',
      expiryDate: '08/26',
      isDefault: false
    }
  ]);

  const currentPlan = {
    name: isArabic ? 'خطة احترافية' : 'Pro Plan',
    price: 299.99,
    currency: 'SAR',
    billingCycle: isArabic ? 'شهرياً' : 'Monthly',
    nextBilling: '2024-02-15'
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'overdue': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Calendar className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return isArabic ? 'مدفوع' : 'Paid';
      case 'pending': return isArabic ? 'معلق' : 'Pending';
      case 'overdue': return isArabic ? 'متأخر' : 'Overdue';
      default: return status;
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast({
      title: isArabic ? "تحميل الفاتورة" : "Downloading Invoice",
      description: isArabic ? `جاري تحميل فاتورة ${invoice.id}` : `Downloading invoice ${invoice.id}`
    });
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: isArabic ? "إضافة طريقة دفع" : "Add Payment Method",
      description: isArabic ? "سيتم فتح نافذة إضافة طريقة دفع جديدة" : "Payment method setup window will open"
    });
  };

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`${isArabic ? 'text-right' : ''}`}>
            <h1 className={`text-3xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الفواتير والمدفوعات' : 'Billing & Payments'}
            </h1>
            <p className={`text-gray-600 dark:text-gray-400 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'إدارة فواتيرك وطرق الدفع' : 'Manage your invoices and payment methods'}
            </p>
          </div>
          <Receipt className="h-8 w-8 text-blue-600" />
        </div>

        {/* Billing Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold ${isArabic ? 'font-arabic' : ''}`}>
                    {currentPlan.price.toFixed(2)} {currentPlan.currency}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'الخطة الحالية' : 'Current Plan'}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold text-green-600 ${isArabic ? 'font-arabic' : ''}`}>
                    {totalPaid.toFixed(2)} {currentPlan.currency}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'إجمالي المدفوع' : 'Total Paid'}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`${isArabic ? 'text-right' : ''}`}>
                  <p className={`text-2xl font-bold text-yellow-600 ${isArabic ? 'font-arabic' : ''}`}>
                    {pendingAmount.toFixed(2)} {currentPlan.currency}
                  </p>
                  <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {isArabic ? 'معلق' : 'Pending'}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الخطة الحالية' : 'Current Plan'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className={`${isArabic ? 'text-right' : ''}`}>
                <h3 className={`text-xl font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                  {currentPlan.name}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                  {currentPlan.price} {currentPlan.currency} / {currentPlan.billingCycle}
                </p>
                <p className={`text-sm text-gray-500 mt-2 ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'التجديد التالي:' : 'Next billing:'} {currentPlan.nextBilling}
                </p>
              </div>
              <Button variant="outline">
                <span className={isArabic ? 'font-arabic' : ''}>
                  {isArabic ? 'تغيير الخطة' : 'Change Plan'}
                </span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'طرق الدفع' : 'Payment Methods'}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className={isArabic ? 'font-arabic' : ''}>
                    {isArabic ? 'إضافة' : 'Add'}
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <CreditCard className="h-6 w-6 text-gray-600" />
                      <div className={`${isArabic ? 'text-right' : ''}`}>
                        <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                          **** **** **** {method.last4}
                        </p>
                        <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                          {isArabic ? 'تنتهي في' : 'Expires'} {method.expiryDate}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className={`${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? 'افتراضي' : 'Default'}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'الفواتير الحديثة' : 'Recent Invoices'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className={`flex items-center justify-between p-4 border rounded-lg ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={`${isArabic ? 'text-right' : ''}`}>
                        <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>{invoice.id}</p>
                        <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                          {invoice.description}
                        </p>
                        <p className={`text-sm text-gray-500 ${isArabic ? 'font-arabic' : ''}`}>
                          {invoice.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={`${isArabic ? 'text-right' : ''}`}>
                        <p className={`font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                          {invoice.amount.toFixed(2)} {currentPlan.currency}
                        </p>
                        <Badge className={`${getStatusColor(invoice.status)} text-white flex items-center gap-1 ${isArabic ? 'font-arabic' : ''}`}>
                          {getStatusIcon(invoice.status)}
                          {getStatusText(invoice.status)}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                        disabled={invoice.status === 'pending'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
