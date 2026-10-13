import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Radio, 
  Database, 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

interface ArchLayer {
  id: string;
  name: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  summary: string;
  technologies: string[];
  patterns: string[];
  codeSample?: string;
}

const ARCH_LAYERS: ArchLayer[] = [
  {
    id: 'gateway',
    name: 'API Gateway & Security',
    title: 'Edge Routing, Rate-Limiting & Identity',
    icon: <Lock className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    badge: 'Edge Layer',
    summary: 'The ingress gateway handles unified routing, SSL termination, rate limiting, and OAuth2/JWT token validation before traffic touches domain services.',
    technologies: ['Ocelot API Gateway', 'YARP (Yet Another Reverse Proxy)', 'Azure API Management', 'OAuth2 / OpenID Connect', 'JWT Bearer Authentication'],
    patterns: ['Token Validation Middleware', 'Sliding Window Rate Limiting', 'Claims-Based Authorization (RBAC)', 'Request Sanitization & CORS'],
    codeSample: `// Minimal API Ingress Authentication & Rate Limiting
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.Authority = builder.Configuration["Auth:Authority"];
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            ValidateAudience = true,
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddRateLimiter(options => options.AddFixedWindowLimiter("api", opt => {
    opt.PermitLimit = 100;
    opt.Window = TimeSpan.FromSeconds(60);
}));`
  },
  {
    id: 'core',
    name: '.NET Core & Microservices',
    title: 'Clean Architecture & CQRS Domain Core',
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    color: 'purple',
    badge: 'Domain Core',
    summary: 'Modular ASP.NET Core services partitioned by Bounded Contexts. Strict isolation between Domain, Application, and Infrastructure layers using CQRS.',
    technologies: ['.NET 8 / 9 runtime', 'ASP.NET Core Minimal APIs & Web APIs', 'MediatR (CQRS handlers)', 'FluentValidation', 'Polly Resiliency policies'],
    patterns: ['Clean / Onion Architecture', 'CQRS (Command-Query Responsibility Segregation)', 'Domain-Driven Design (Aggregates & Value Objects)', 'Result & Pipeline Behavior Pattern'],
    codeSample: `// CQRS Command Handler with MediatR & Pipeline Behavior
public sealed class CreateOrderCommandHandler 
    : IRequestHandler<CreateOrderCommand, Result<Guid>>
{
    private readonly IOrderRepository _repo;
    private readonly IEventPublisher _publisher;

    public async Task<Result<Guid>> Handle(CreateOrderCommand cmd, CancellationToken ct)
    {
        var order = Order.Create(cmd.CustomerId, cmd.LineItems);
        await _repo.AddAsync(order, ct);
        await _publisher.PublishAsync(new OrderCreatedDomainEvent(order.Id), ct);
        return Result.Success(order.Id);
    }
}`
  },
  {
    id: 'messaging',
    name: 'Asynchronous Messaging',
    title: 'Event-Driven Pub/Sub & Decoupling',
    icon: <Radio className="w-5 h-5 text-cyan-400" />,
    color: 'cyan',
    badge: 'Event Bus',
    summary: 'Decoupled inter-service communication through asynchronous message queues and event brokers to ensure zero data loss and eventual consistency.',
    technologies: ['Azure Service Bus (Queues & Topics)', 'Azure Event Grid', 'Azure Event Hubs', 'RabbitMQ / MassTransit'],
    patterns: ['Publish/Subscribe Messaging', 'Outbox Pattern for Guaranteed Delivery', 'Idempotent Consumer Pattern', 'Dead-Letter Queue (DLQ) automated replay'],
    codeSample: `// Azure Service Bus Topic Publisher with Outbox Pattern
public async Task PublishOrderEventAsync(OrderCreatedDomainEvent evt, CancellationToken ct)
{
    var sender = _serviceBusClient.CreateSender("orders.topic");
    var message = new ServiceBusMessage(JsonSerializer.Serialize(evt)) {
        ContentType = "application/json",
        MessageId = evt.EventId.ToString(),
        CorrelationId = evt.CorrelationId
    };
    await sender.SendMessageAsync(message, ct);
}`
  },
  {
    id: 'database',
    name: 'Database & High-Speed Cache',
    title: 'Relational Integrity & Sub-Millisecond Caching',
    icon: <Database className="w-5 h-5 text-red-400" />,
    color: 'red',
    badge: 'Data Tier',
    summary: 'Hybrid relational and caching persistence strategy: SQL Server for ACID consistency and complex reporting, alongside Redis for fast distributed state.',
    technologies: ['Microsoft SQL Server 2022', 'Azure SQL & Cosmos DB', 'Redis Distributed Cache', 'Entity Framework Core 8/9', 'Dapper Micro-ORM'],
    patterns: ['Compiled EF Core Queries', 'Read/Write Replica Splitting', 'Optimistic & Pessimistic Concurrency Handling', 'Index Tuning & Execution Plan Optimization'],
    codeSample: `// High-Performance Dapper Query with SQL Index Utilization
public async Task<IReadOnlyList<OrderSummaryDto>> GetRecentOrdersAsync(Guid customerId)
{
    const string sql = @"
        SELECT o.Id, o.CreatedAt, o.TotalAmount, o.Status
        FROM Orders o WITH (NOLOCK)
        WHERE o.CustomerId = @CustomerId AND o.IsDeleted = 0
        ORDER BY o.CreatedAt DESC;";

    using var conn = _dbFactory.CreateConnection();
    var result = await conn.QueryAsync<OrderSummaryDto>(sql, new { CustomerId = customerId });
    return result.AsList();
}`
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure & DevOps',
    title: 'Azure Containerization & Automated CI/CD',
    icon: <Cloud className="w-5 h-5 text-blue-400" />,
    color: 'blue',
    badge: 'Infrastructure',
    summary: 'Fully automated multi-stage pipelines deploying containerized services to Azure Kubernetes Service and Azure App Services with centralized telemetry.',
    technologies: ['Microsoft Azure (AKS, App Services, Functions)', 'Docker & Docker Compose', 'Azure DevOps Pipelines & GitHub Actions', 'Terraform & ARM Templates', 'Application Insights & Log Analytics'],
    patterns: ['Infrastructure as Code (IaC)', 'Blue/Green & Canary Deployments', 'Structured Serilog Logging & OpenTelemetry', 'Horizontal Pod Autoscaling (HPA)'],
    codeSample: `# Multi-Stage Dockerfile for High-Performance .NET 9 API
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/Api/Api.csproj", "Api/"]
RUN dotnet restore "Api/Api.csproj"
COPY . .
RUN dotnet publish "Api/Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final
WORKDIR /app
COPY --from=build /app/publish .
USER app
ENTRYPOINT ["dotnet", "Api.dll"]`
  }
];

export const InteractiveArchitecture: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('core');
  const activeLayer = ARCH_LAYERS.find((l) => l.id === selectedLayerId) || ARCH_LAYERS[1];

  return (
    <section id="architecture" className="relative py-24 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>Enterprise Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Interactive System Architecture
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl font-light">
            Click on any tier of my standard enterprise architecture topology to inspect the technologies, patterns, and production implementations I deliver.
          </p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Layer Topology Flow */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 px-1">
              Select an Architectural Layer:
            </p>
            {ARCH_LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`relative w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                    isSelected
                      ? 'tech-card-selected -translate-x-1'
                      : 'tech-surface hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg bg-[#080b12] border border-slate-800 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                      {layer.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-tight">
                          {layer.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#080b12] text-slate-300 border border-slate-800">
                          {layer.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-light">
                        {layer.title}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-teal-400 translate-x-1' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive Pane */}
          <div className="lg:col-span-7 rounded-2xl tech-surface p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#080b12] border border-slate-800">
                  {activeLayer.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-teal-400 tracking-wider uppercase">
                    {activeLayer.badge} Detail
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                    {activeLayer.name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed my-5 font-light">
              {activeLayer.summary}
            </p>

            {/* Technologies Grid */}
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                Core Technologies & Frameworks:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeLayer.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architectural Patterns */}
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                Architectural Patterns & Best Practices:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLayer.patterns.map((pat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{pat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code / Config Snippet */}
            {activeLayer.codeSample && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Architectural Code Implementation:
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Production Pattern</span>
                </div>
                <div className="rounded-xl bg-[#030508] border border-white/10 p-4 font-mono text-xs overflow-x-auto text-emerald-300 leading-relaxed max-h-64">
                  <pre>{activeLayer.codeSample}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
