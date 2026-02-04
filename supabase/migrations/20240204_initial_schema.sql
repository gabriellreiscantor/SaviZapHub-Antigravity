-- Tipos ENUM para status e papéis
create type message_role as enum ('user', 'bot', 'agent');
create type conversation_status as enum ('waiting', 'in_progress', 'closed', 'returned_to_bot');
create type queue_status as enum ('pending', 'processing', 'sent', 'failed');
create type queue_priority as enum ('high', 'normal', 'low');
create type message_media_type as enum ('text', 'audio', 'image', 'document', 'vcard');

-- Tabela: bot_configurations (Configurações do Tenant)
create table bot_configurations (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null, -- Em um cenário real, seria FK para auth.users
    main_prompt text,
    response_mode text check (response_mode in ('humanized', 'objective', 'commercial')),
    use_emojis boolean default true,
    typing_delay numeric default 1.5,
    human_keywords text[],
    human_transfer_message text,
    outside_hours_enabled boolean default false,
    outside_hours_message text,
    purchase_intent_enabled boolean default false,
    purchase_intent_keywords text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tabela: attendants (Atendentes Humanos)
create table attendants (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    name text not null,
    phone text,
    email text,
    is_active boolean default true,
    is_available boolean default true,
    max_concurrent_chats integer default 5,
    current_chats integer default 0,
    created_at timestamp with time zone default now()
);

-- Tabela: conversations (Conversas Ativas)
create table conversations (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    client_name text,
    client_phone text not null,
    status conversation_status default 'in_progress',
    assigned_attendant_id uuid references attendants(id),
    summary text,
    last_message_at timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

-- Tabela: messages (Histórico de Mensagens)
create table messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid references conversations(id) on delete cascade,
    role message_role not null,
    content text,
    message_type message_media_type default 'text',
    media_url text,
    created_at timestamp with time zone default now()
);

-- Tabela: message_queue (Fila de Envio)
create table message_queue (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    phone text not null,
    message_content text not null,
    status queue_status default 'pending',
    priority queue_priority default 'normal',
    retry_count integer default 0,
    scheduled_at timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tabela: faq_entries
create table faq_entries (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    question text not null,
    answer_prompt text not null,
    question_variations text[],
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- Tabela: products_services
create table products_services (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    name text not null,
    description text,
    price numeric,
    category text,
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- Tabela: business_hours
create table business_hours (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    day_of_week integer check (day_of_week between 0 and 6), -- 0=Domingo
    start_time time,
    end_time time,
    is_open boolean default true
);

-- Tabela: multimedia_settings
create table multimedia_settings (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null,
    listen_audio boolean default true,
    respond_audio boolean default false,
    view_images boolean default true,
    interpret_docs boolean default false,
    tts_provider text default 'edge_tts',
    tts_voice text,
    tts_speed numeric default 1.0
);

-- Índices para performance
create index idx_conversations_tenant_phone on conversations(tenant_id, client_phone);
create index idx_messages_conversation on messages(conversation_id);
create index idx_queue_status on message_queue(status) where status = 'pending';
