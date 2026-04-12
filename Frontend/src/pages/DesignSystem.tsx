import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-text-primary">HMS Design System</h1>
        <p className="text-text-secondary font-body mt-1">
          Strictly solid colors, clinical typography, and zero gradients.
        </p>
      </div>

      <Card title="1. Buttons (Solid Fills)">
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="destructive">Destructive Action</Button>
          <Button variant="primary" disabled>Disabled State</Button>
        </div>
      </Card>

      <Card title="2. Status Badges">
        <div className="flex flex-wrap gap-4 items-center">
          <Badge status="success" label="Paid / Confirmed" />
          <Badge status="warning" label="Pending / Waiting" />
          <Badge status="error" label="Cancelled / Overdue" />
          <Badge status="info" label="Informational" />
        </div>
      </Card>

      <Card title="3. Form Inputs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Patient Name" placeholder="e.g. Rahul Mehta" />
          <Input label="Contact Number" placeholder="+91 98765 43210" helperText="Used for Twilio SMS reminders" />
          <Input label="Email Address" error="Invalid email address format" defaultValue="invalid-email" />
        </div>
      </Card>

      <Card title="4. Typography & Monospace Data">
        <div className="space-y-3 font-body">
          <p className="font-heading text-xl text-text-primary">Heading - Fraunces Serif Font</p>
          <p className="font-body text-text-primary">Body Copy - Inter Sans Font for standard interface text.</p>
          <p className="font-mono text-sm text-text-secondary bg-background p-2 border border-border rounded">
            Numeric / Tabular Data (IBM Plex Mono): Patient ID #PAT-2026-0894 | Token #04 | Fee: ₹1,200.00
          </p>
        </div>
      </Card>
    </div>
  );
};
